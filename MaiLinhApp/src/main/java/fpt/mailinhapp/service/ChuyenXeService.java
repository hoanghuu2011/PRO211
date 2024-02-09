package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.*;
import fpt.mailinhapp.dto.*;
import fpt.mailinhapp.exception.BusesException;
import fpt.mailinhapp.exception.CarsException;
import fpt.mailinhapp.repository.*;
import fpt.mailinhapp.respondata.ChuyenTheoTuyen;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ChuyenXeService {
    @Autowired
    ChuyenXeRepository dao;
    @Autowired
    NhanVienRepository nvDao;
    @Autowired
    TuyenXeRepository tuyenDao;
    @Autowired
    XeRepository xeDao;
    @Autowired
    DatVeRepository datVeDao;

    @Transactional(rollbackFor = Exception.class)
    public ChuyenXeDto instertChuyenXe(ChuyenXeDto dto){
        ChuyenXe entity = new ChuyenXe();

        BeanUtils.copyProperties(dto,entity, new String[]{"xe","tuyenXe","nhanViens"});

        TuyenXe tx = tuyenDao.findById(dto.getTuyenXe()).get();
        Xe xe = xeDao.findById(dto.getXe()).get();
        List<NhanVien> nhanVienList = new ArrayList<>();
        for (NhanVienDto i : dto.getNhanViens()) {
            NhanVien byId = nvDao.findById(i.getSoCCCD()).get();
            nhanVienList.add(byId);
        }

        entity.setXe(xe);
        entity.setTuyenXe(tx);
        entity.setNhanViens(nhanVienList);

        var savEntity = dao.save(entity);

        dto.setMaChuyen(savEntity.getMaChuyen());

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public ChuyenXeDto updateChuyenXe(Long id,ChuyenXeDto dto){
        var found = dao.findById(id).orElseThrow(()->new BusesException("Chuyến xe không tồn tại"));

        BeanUtils.copyProperties(dto, found,new String[]{"xe","tuyenXe","nhanViens"});

        List<NhanVien> nhanVienList = new ArrayList<>();
        for (NhanVienDto i : dto.getNhanViens()) {
            NhanVien byId = nvDao.findById(i.getSoCCCD()).get();
            nhanVienList.add(byId);
        }
        found.setNhanViens(nhanVienList);

        if(dto.getXe() != null){
            Xe xe = xeDao.findById(dto.getXe()).get();
            found.setXe(xe);
        }

        if(dto.getTuyenXe() != null){
            TuyenXe tx = tuyenDao.findById(dto.getTuyenXe()).get();
            found.setTuyenXe(tx);
        }


        var saveEntity = dao.save(found);

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteChuyen(Long id){
        var found = dao.findById(id).orElseThrow(()-> new BusesException("Chuyến xe không tồn tại"));

        dao.delete(found);
    }

    public List<ChuyenXe> findAll() {
        return dao.findAll();
    }

    public List<ChuyenXeDto> timChuyen(String diemDi, String diemDen, boolean check) {
        List<ChuyenXe> listEntity = dao.findByTuyenXe_DiemDiLikeAndTuyenXe_DiemDenLike(diemDi, diemDen);
        System.out.println(check);
        if(check){
            // Lọc danh sách chuyến xe, chỉ giữ lại những chuyến đi sau thời điểm hiện tại + 30 phút.
        LocalTime now = LocalTime.now().plusMinutes(30).truncatedTo(ChronoUnit.SECONDS);
        System.out.println(now);
        List<ChuyenXe> listData = listEntity.stream()
                .filter(chuyenXe -> parseTime(chuyenXe.getTuyenXe().getTgDi())
                        .isAfter(now))
                .collect(Collectors.toMap(
                        chuyenXe -> chuyenXe.getMaChuyen(),
                        chuyenXe -> chuyenXe,
                        (existing, replacement) -> existing)
                ).values().stream()
                .collect(Collectors.toList());
        return listData.stream().map(item -> {
            ModelMapper mapper = new ModelMapper();
            ChuyenXeDto chuyenXeDto = mapper.map(item, ChuyenXeDto.class);


            chuyenXeDto.setXedto(convertXeToDto(item.getXe()));


            return chuyenXeDto;

        }).collect(Collectors.toList());
        }else{
            // Nếu điều kiện kiểm tra là false, trả về danh sách chuyến xe không lọc.
            return listEntity.stream().map(item -> {
                ModelMapper mapper = new ModelMapper();
                ChuyenXeDto chuyenXeDto = mapper.map(item, ChuyenXeDto.class);


                chuyenXeDto.setXedto(convertXeToDto(item.getXe()));


                return chuyenXeDto;
            }).collect(Collectors.toList());
        }
    }

    private LocalTime parseTime(LocalTime time) {
        return time;
    }

    public List<ChuyenXeDto> findByTuyen(ChuyenTheoTuyen dto) {
        List<ChuyenXe> listEntity = dao.findByTuyenXe_DiemDiLikeAndTuyenXe_DiemDenLike(dto.getDiemDi(), dto.getDiemDen());

        List<ChuyenXeDto> listDto = listEntity.stream().map(item -> {
            ModelMapper mapper = new ModelMapper();
            ChuyenXeDto chuyenXeDto = mapper.map(item, ChuyenXeDto.class);


            chuyenXeDto.setXedto(convertXeToDto(item.getXe()));


            return chuyenXeDto;
        }).collect(Collectors.toList());

        return listDto;
    }

    public List<NhanVienDto> getListNhanVienByChuyen(){
        var found = nvDao.findNhanVienWithChuyenXe();
        if(found == null){
            return null;
        }
        var listDto = found.stream().map(item->{
            ModelMapper mapper = new ModelMapper();
            return mapper.map(item, NhanVienDto.class);
        }).collect(Collectors.toList());

        return listDto;
    }


    public List<String> getCho(Long idChuyen, Date ngayDi){

        var found = datVeDao.findByChuyenXe_MaChuyenAndNgayDi(idChuyen,ngayDi);
        List<String> data = found.stream().flatMap(i->i.getChoNgoi().stream()).collect(Collectors.toList());
        return data;
    }

    public List<String> getCho2(Long idChuyen, Date ngayVe){

        var found = datVeDao.findByChuyenXeVe_MaChuyenAndNgayVe(idChuyen, ngayVe);
        List<String> data = found.stream().flatMap(i->i.getChoNgoi2().stream()).collect(Collectors.toList());
        return data;
    }

    private XeDto convertXeToDto(Xe xe) {
        XeDto xeDto = new XeDto();
        BeanUtils.copyProperties(xe, xeDto);
        LoaiXeDto loaiXeDto = convertLoaiXeToDto(xe.getLoaiXe());
        xeDto.setLoaiXe(loaiXeDto);
        NhaXeDto nhaXeDto = convertNhaXeToDto(xe.getNhaXe());
        xeDto.setNhaXe(nhaXeDto);

        return xeDto;
    }
    private LoaiXeDto convertLoaiXeToDto(LoaiXe loaiXe) {
        LoaiXeDto loaiXeDto = new LoaiXeDto();
        BeanUtils.copyProperties(loaiXe, loaiXeDto);

        return loaiXeDto;
    }
    private NhaXeDto convertNhaXeToDto(NhaXe nhaXe) {
        NhaXeDto nhaXeDto = new NhaXeDto();
        BeanUtils.copyProperties(nhaXe, nhaXeDto);

        return nhaXeDto;
    }

}
