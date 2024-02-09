package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.NoiTra;
import fpt.mailinhapp.dto.NoiTraDto;
import fpt.mailinhapp.exception.BusesException;
import fpt.mailinhapp.repository.NoiTraRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NoiTraService {
    @Autowired
    NoiTraRepository dao;

    @Transactional(rollbackFor = Exception.class)
    public NoiTraDto insertNoiTra(NoiTraDto dto){
        NoiTra entity = new NoiTra();
        BeanUtils.copyProperties(dto, entity);
        var save = dao.save(entity);
        dto.setId(save.getId());
        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public NoiTraDto updateNoiTra(Long id,NoiTraDto dto){
        var found = dao.findById(id).orElseThrow(()-> new BusesException("Nơi trả không tồn tại"));
        BeanUtils.copyProperties(dto, found);
        dao.save(found);
        return dto;
    }
    @Transactional(rollbackFor = Exception.class)
    public void deleteNoiTra(Long id){
        var found = dao.findById(id).orElseThrow(()-> new BusesException("Nơi trả không tônf tại"));
        dao.delete(found);
    }

    public List<NoiTra> findAll() {
        return dao.findAll();
    }
}
