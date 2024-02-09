package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.AnhDaLuu;
import fpt.mailinhapp.domain.TaiKhoan;
import fpt.mailinhapp.domain.ThanhVien;
import fpt.mailinhapp.dto.TaiKhoanDto;
import fpt.mailinhapp.dto.ThanhVienDto;
import fpt.mailinhapp.exception.CustomerException;
import fpt.mailinhapp.repository.AnhDaLuuRepository;
import fpt.mailinhapp.repository.ThanhVienRepository;
import jakarta.mail.MessagingException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;
import java.util.List;


@Service
public class CustomerService {
    @Autowired
    ThanhVienRepository dao;

    @Autowired
    AnhDaLuuRepository imgDao;

    @Autowired
    FileStorageService imgService;
    @Autowired
    private EmailService emailService;
    @Transactional(rollbackFor = Exception.class)
    public ThanhVienDto insertCustomers(ThanhVienDto dto){
        ThanhVien entity = new ThanhVien();
        BeanUtils.copyProperties(dto, entity);

        if(dto.getAnhDaLuu() != null){
            AnhDaLuu img = new AnhDaLuu();
            BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
            var saveImg = imgDao.save(img);
            BeanUtils.copyProperties(saveImg, dto.getAnhDaLuu());
            entity.setAnhDaLuu(saveImg);
        }


        TaiKhoan tk=new TaiKhoan();
        BeanUtils.copyProperties(dto.getTaiKhoan(),tk);
        entity.setTaiKhoan(tk);


        TaiKhoan taiKhoan = new TaiKhoan();
        BeanUtils.copyProperties(dto.getTaiKhoan(), taiKhoan);
        entity.setTaiKhoan(taiKhoan);


        var saveCus = dao.save(entity);
        dto.setSoDT(saveCus.getSoDT());

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public ThanhVienDto updateCustomers(String id, ThanhVienDto dto){
        var found = dao.findById(id).orElseThrow(()-> new CustomerException("Thành viên không tồn tại"));

        String[] ignoreFields = new String[]{"ngayTao","anhDaLuu","ngayChinhSu","soDT"};

        BeanUtils.copyProperties(dto, found, ignoreFields);

        if(dto.getAnhDaLuu() != null){

            if(dto.getAnhDaLuu().getId() == null){
                AnhDaLuu img = new AnhDaLuu();
                BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
                imgDao.save(img);
                found.setAnhDaLuu(img);
            }

            if(found.getAnhDaLuu() == null){
                AnhDaLuu img = new AnhDaLuu();
                BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
                imgDao.save(img);
                found.setAnhDaLuu(img);
            }else {
                if (dto.getAnhDaLuu().getId() != found.getAnhDaLuu().getId()){
                    imgService.deleteImage(found.getAnhDaLuu().getTenTep());
                    AnhDaLuu img = new AnhDaLuu();
                    BeanUtils.copyProperties(dto.getAnhDaLuu(), img);
                    imgDao.save(img);
                    found.setAnhDaLuu(img);
                }
            }
        }


        var saveEntity = dao.save(found);


        dto.setSoDT(found.getSoDT());

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteCus(String id){
        var found = dao.findById(id).orElseThrow(()->new CustomerException("Thành viên không tồn tại"));

        if(found.getAnhDaLuu() != null){
            imgService.deleteImage(found.getAnhDaLuu().getTenTep());
            imgDao.deleteById(found.getAnhDaLuu().getId());
        }

        dao.delete(found);
    }

    public List findAll() {
        return (List) dao.findAll();
    }

    public ThanhVienDto findById(String id) {
        var found = dao.findById(id).orElseThrow(()->new CustomerException("Thành viên không tồn tại"));
        ModelMapper mapper = new ModelMapper();

        var dto = mapper.map(found, ThanhVienDto.class);


        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void doimk(String soDT, String email) throws MessagingException {
        ThanhVien thanhVien = dao.findBySoDTAndEmail(soDT, email)
                .orElseThrow(() -> new CustomerException("Thông tin không hợp lệ"));


        String newPassword = generateNewPassword();

        thanhVien.getTaiKhoan().setMatKhau(newPassword);
        dao.save(thanhVien);

        emailService.sendPasswordResetEmail(thanhVien.getEmail(), newPassword);
    }

    private String generateNewPassword() {
        String newPassword = UUID.randomUUID().toString().replace("-", "");
        return newPassword.substring(0, 8);
    }
}
