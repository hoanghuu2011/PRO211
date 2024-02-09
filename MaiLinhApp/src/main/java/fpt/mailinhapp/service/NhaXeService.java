package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.NhaXe;
import fpt.mailinhapp.dto.NhaXeDto;
import fpt.mailinhapp.exception.CarsException;
import fpt.mailinhapp.repository.NhaXeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NhaXeService {
    @Autowired
    NhaXeRepository dao;

    @Transactional(rollbackFor = Exception.class)
    public NhaXeDto createNhaXe(NhaXeDto dto){
        NhaXe entity = new NhaXe();
        BeanUtils.copyProperties(dto, entity);
        var save = dao.save(entity);
        dto.setId(save.getId());
        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public NhaXeDto updateNhaXe(Long id, NhaXeDto dto){
        var found = dao.findById(id).orElseThrow(()-> new CarsException("Không tìm thấy nhà xe"));
        BeanUtils.copyProperties(dto, found);
        dao.save(found);
        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteNhaXe(Long id){
        var found = dao.findById(id).orElseThrow(()-> new CarsException("Không tìm thấy nhà xe"));
        dao.delete(found);
    }

    public List<NhaXe> findAll() {
        return dao.findAll();
    }
}
