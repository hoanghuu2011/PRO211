package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.*;
import fpt.mailinhapp.dto.*;
import fpt.mailinhapp.exception.TicketsException;
import fpt.mailinhapp.repository.DatVeRepository;
import fpt.mailinhapp.repository.InfoRepository;
import fpt.mailinhapp.repository.ThanhToanRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VeXeService {
    @Autowired
    DatVeRepository dao;
    @Autowired
    InfoRepository infoDao;
    @Autowired
    ThanhToanRepository dao1;
    @Autowired
    private EmailService emailService;
    @Transactional(rollbackFor = Exception.class)
    public DatVeDto createVe(DatVeDto dto){
        DatVe entity = new DatVe();
        Info info = new Info();
        ThanhToan pay = new ThanhToan();

        ModelMapper mapper = new ModelMapper();
        BeanUtils.copyProperties(dto,entity, new String[]{"ngayDatVe","info","thanhToan"});
        BeanUtils.copyProperties(dto.getInfo(), info);
        BeanUtils.copyProperties(dto.getThanhToan(),pay);
        ChuyenXe cx = mapper.map(dto.getChuyenXe(), ChuyenXe.class);
        if(dto.getChuyenXeVe() != null){
            ChuyenXe cxv = mapper.map(dto.getChuyenXeVe(), ChuyenXe.class);
            entity.setChuyenXeVe(cxv);
        }

        entity.setChuyenXe(cx);
        entity.setThanhToan(pay);
        var saveInfo = infoDao.save(info);
        entity.setInfo(saveInfo);
        var saveEntity = dao.save(entity);
        dto.setMaVe(saveEntity.getMaVe());

        return dto;
    }

    public List<DatVe> findAll() {
        return dao.findAll();
    }

    public List<DatVeDto> findBysoDT(String id){
        List<DatVe> found = dao.findByInfo_SoDTLike(id);
        if(found != null){
            List<DatVeDto> dto = new ArrayList<>();
            dto = found.stream().map(i->{
                ModelMapper mapper = new ModelMapper();
                return mapper.map(i, DatVeDto.class);
            }).collect(Collectors.toList());
            return dto;
        }
        return null;
    }

    private DatVeDto convertToDto(DatVe datVe) {
        DatVeDto datVeDto = new DatVeDto();
        datVeDto.setMaVe(datVe.getMaVe());
        datVeDto.setSoLuong(datVe.getSoLuong());
        datVeDto.setTongTien(datVe.getTongTien());
        datVeDto.setNoiTra(datVe.getNoiTra());
        datVeDto.setChoNgoi(datVe.getChoNgoi());
        datVeDto.setChoNgoi2(datVe.getChoNgoi2());
        datVeDto.setNgayDi(datVe.getNgayDi());
        datVeDto.setNgayVe(datVe.getNgayVe());
        ChuyenXeDto chuyenXeDto = convertChuyenXeToDto(datVe.getChuyenXe());
        datVeDto.setChuyenXe(chuyenXeDto);

        InfoDto infoDto = convertInfoToDto(datVe.getInfo());
        datVeDto.setInfo(infoDto);

        ThanhToanDto thanhToanDto = convertThanhToanToDto(datVe.getThanhToan());
        datVeDto.setThanhToan(thanhToanDto);

        return datVeDto;
    }

    private TuyenXeDto convertTuyenXeToDto(TuyenXe tuyenXe) {
        TuyenXeDto tuyenXeDto = new TuyenXeDto();

        BeanUtils.copyProperties(tuyenXe, tuyenXeDto);
        return tuyenXeDto;

    }

    private ThanhToanDto convertThanhToanToDto(ThanhToan thanhToan) {
        ThanhToanDto thanhToanDto = new ThanhToanDto();
        BeanUtils.copyProperties(thanhToan, thanhToanDto);
        return thanhToanDto;
    }
    private ChuyenXeDto convertChuyenXeToDto(ChuyenXe chuyenXe) {
        ChuyenXeDto chuyenXeDto = new ChuyenXeDto();
        BeanUtils.copyProperties(chuyenXe, chuyenXeDto);

        XeDto xeDto = convertXeToDto(chuyenXe.getXe());
        chuyenXeDto.setXedto(xeDto);


        List<NhanVienDto> nhanVienDtos = chuyenXe.getNhanViens().stream()
                .map(this::convertNhanVienToDto)
                .collect(Collectors.toList());

        chuyenXeDto.setNhanViens(nhanVienDtos);
        TuyenXeDto tuyenXeDto = convertTuyenXeToDto(chuyenXe.getTuyenXe());
        chuyenXeDto.setTuyenXe(tuyenXeDto.getMaTuyenXe());
        return chuyenXeDto;

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
    private NhanVienDto convertNhanVienToDto(NhanVien nhanVien) {
        NhanVienDto nhanVienDto = new NhanVienDto();
        BeanUtils.copyProperties(nhanVien, nhanVienDto);

        return nhanVienDto;
    }

    private InfoDto convertInfoToDto(Info info) {
        InfoDto infoDto = new InfoDto();
        BeanUtils.copyProperties(info, infoDto);
        return infoDto;
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
    @Transactional(rollbackFor = Exception.class)
    public DatVeDto getDatVeByThanhToanId(String thanhToanId) {
        Optional<DatVe> datVeOptional = dao.findByThanhToan_Id(thanhToanId);

        if (datVeOptional.isPresent()) {
            DatVe datVe = datVeOptional.get();
            return convertToDto(datVe);
        } else {
            throw new TicketsException("Không tìm thấy vé liên quan đến thanh toán với mã: " + thanhToanId);
        }
    }


    public DatVeDto findById(Long id){
        var found = dao.findById(id).orElseThrow(()-> new TicketsException("Mã vé không tồn tại"));
        ModelMapper mapper = new ModelMapper();
        return mapper.map(found,DatVeDto.class);
    }

    public void deleteVe(String thanhToanId) {
        var found = dao.findByThanhToan_Id(thanhToanId).orElseThrow(() -> new TicketsException("Mã vé không tồn tại"));
        var time = found.getThanhToan().getPayDate();
        LocalDateTime now = LocalDateTime.now();


        var tgDi = found.getChuyenXe().getTuyenXe().getTgDi();


        Duration duration = Duration.between(time, now);
        Duration duration1 = Duration.between(tgDi, now);

        if (duration.toMinutes() <= 30  ) {
            dao.delete(found);
            sendDeleteSuccessEmail(found);
        }else{
            throw new TicketsException("Đã quá thời gian hủy vé");
        }
    }

    private void sendDeleteSuccessEmail(DatVe datVe) {
        try {
            ThanhToan thanhToan = datVe.getThanhToan();

            String toEmail = datVe.getInfo().getEmail();
            String subject = "Xác nhận hủy vé thành công " + " cho đơn hàng " + "#" + thanhToan.getId();

            String text = "Chúng tôi xác nhận rằng vé của bạn đã được hủy thành công." +
                    "<br>" +
                    "Thông tin chi tiết:" +
                    "<br>" +
                    "Mã vé: " + thanhToan.getId() +
                    "<br>" +
                    "Tên Khách hàng: " + datVe.getInfo().getHoTen() +
                    "<br>" +
                    "Ngày hủy: " + LocalDateTime.now() +
                    "<br>" +
                    "Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!";
            emailService.sendEmail(toEmail, subject, text);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
