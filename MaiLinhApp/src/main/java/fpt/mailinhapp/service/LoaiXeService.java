package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.LoaiXe;
import fpt.mailinhapp.dto.LoaiXeDto;
import fpt.mailinhapp.repository.LoaiXeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LoaiXeService {
    @Autowired
    LoaiXeRepository dao;

    @Transactional(rollbackFor = Exception.class)
    public LoaiXeDto insertLoaiXe(LoaiXeDto dto){
        LoaiXe entity = new LoaiXe();
        BeanUtils.copyProperties(dto, entity);

        var saveEntity = dao.save(entity);

        dto.setId(saveEntity.getId());

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public LoaiXeDto updateLoaixe(Integer id,LoaiXeDto dto){
        var found = dao.findById(id).orElseThrow(()->new RuntimeException("Loại xe không tồn tại"));
        BeanUtils.copyProperties(dto, found);

         dao.save(found);

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteLoai(Integer id){
        var found = dao.findById(id).orElseThrow(()->new RuntimeException("Loại xe không tồn tại"));
        dao.delete(found);
    }

    public List<LoaiXe> findAll() {
        return dao.findAll();
    }

    public LoaiXeDto findById(Integer id) {
        var found = dao.findById(id).orElseThrow(()->new RuntimeException("loại xe không tồn tại"));

        LoaiXeDto dto = new LoaiXeDto();
        BeanUtils.copyProperties(found,dto);

        return dto;
    }
}
