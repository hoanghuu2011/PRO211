package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.AnhDaLuu;
import fpt.mailinhapp.domain.NhaXe;
import fpt.mailinhapp.domain.NhanVien;
import fpt.mailinhapp.dto.NhanVienDto;
import fpt.mailinhapp.exception.CarsException;
import fpt.mailinhapp.exception.EmployeeException;
import fpt.mailinhapp.repository.AnhDaLuuRepository;
import fpt.mailinhapp.repository.NhanVienRepository;
import fpt.mailinhapp.repository.XeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NhanVienService {
    @Autowired
    NhanVienRepository dao;

    @Autowired
    XeRepository xeDao;

    @Autowired
    FileStorageService imgService;

    @Autowired
    AnhDaLuuRepository imgDao;


    @Transactional(rollbackFor = Exception.class)
    public NhanVienDto createEmployee(NhanVienDto dto){
        var found = dao.findById(dto.getSoCCCD());
        if(found.isPresent()){
            throw new EmployeeException("Nhân viên đã tồn tại");
        }

        NhanVien entity = new NhanVien();
        BeanUtils.copyProperties(dto, entity,"nhaXe");

        NhaXe nhaXe = new NhaXe();
        BeanUtils.copyProperties(dto.getNhaXe(), nhaXe);
        entity.setNhaXe(nhaXe);

        if(dto.getAnhDaLuu() != null){
            AnhDaLuu img = new AnhDaLuu();
            BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
            var saveImg = imgDao.save(img);
            BeanUtils.copyProperties(saveImg, dto.getAnhDaLuu());
            entity.setAnhDaLuu(saveImg);
        }

        dao.save(entity);

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public NhanVienDto updateEmploy(String id, NhanVienDto dto){
        var found = dao.findById(id).orElseThrow(()->new EmployeeException("Nhân viên không tồn tại"));


        BeanUtils.copyProperties(dto, found, "anhDaLuu", "nhaXe");

        if (dto.getNhaXe() != null){
            NhaXe nhaXe = new NhaXe();
            BeanUtils.copyProperties(dto.getNhaXe(), nhaXe);
            found.setNhaXe(nhaXe);
        }

        dto.getAnhDaLuu().getTenTep();

        if(dto.getAnhDaLuu() != null){

            if(dto.getAnhDaLuu().getId() == null){
                AnhDaLuu img = new AnhDaLuu();
                BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
                var imgSave = imgDao.save(img);
                BeanUtils.copyProperties(imgSave, dto.getAnhDaLuu());
                found.setAnhDaLuu(imgSave);
            }

            if (dto.getAnhDaLuu().getId() != found.getAnhDaLuu().getId()){

                AnhDaLuu img = new AnhDaLuu();
                BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
                var imgSave = imgDao.save(img);
                found.setAnhDaLuu(imgSave);
            }
        }

        dao.save(found);

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteEmploy(String id){
        var found = dao.findById(id).orElseThrow(()->new EmployeeException("Nhân viên không tồn tại"));

        imgService.deleteImage(found.getAnhDaLuu().getTenTep());

        dao.delete(found);
    }

    public List<NhanVien> findAll() {
        return (List<NhanVien>) dao.findAll();
    }

    public List<NhanVien> findByNhaXe(String id){
        var xe = xeDao.findById(id).orElseThrow(()-> new CarsException("Xe không tồn tại"));
        return dao.findByNhaXe_Id(xe.getNhaXe().getId());
    }
}
