package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.TaiKhoan;
import fpt.mailinhapp.dto.TaiKhoanDto;
import fpt.mailinhapp.exception.AccountException;
import fpt.mailinhapp.repository.TaiKhoanRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanService {
    @Autowired
    TaiKhoanRepository dao;
    @Transactional(rollbackFor = Exception.class)
    public TaiKhoanDto insertAccount(TaiKhoanDto dto){
        var found = dao.findById(dto.getTenTaiKhoan());

        if(!found.isEmpty()){
            throw new AccountException("Tên tài khoản đã tồn tại");
        }

        TaiKhoan entity = new TaiKhoan();
        BeanUtils.copyProperties(dto, entity);


        dao.save(entity);

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public TaiKhoanDto uploadAccount(String id, TaiKhoanDto dto){
        var found = dao.findById(id).orElseThrow(()->new AccountException("Tài khoản không tồn tại"));

        BeanUtils.copyProperties(dto, found);

        dao.save(found);

        return dto;

    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteAccount(String userName){
        var found = dao.findById(userName).orElseThrow(()->new AccountException("Tài khoản không tồn tại"));

        dao.deleteById(userName);
    }

    public List findAll(){return (List) dao.findAll();}

    public TaiKhoanDto CheckLogin(TaiKhoanDto dto){
        var found = dao.findById(dto.getTenTaiKhoan()).orElseThrow(()->new AccountException("Tài khoản không tồn tại"));
        if (!dto.getMatKhau().equalsIgnoreCase(found.getMatKhau())){
            throw new AccountException("Sai mật khẩu");
        }
        BeanUtils.copyProperties(found,dto);
        return dto;
    }
    @Transactional(rollbackFor = Exception.class)
    public void changePassword(String id, TaiKhoanDto dto) {
        var found = dao.findById(id).orElseThrow(() -> new AccountException("Tài khoản không tồn tại"));

        if (!dto.getMatKhau().equals(found.getMatKhau())) {
            throw new AccountException("Mật khẩu cũ không đúng");
        }
        found.setMatKhau(dto.getNewPassword());
        dao.save(found);
    }



}
