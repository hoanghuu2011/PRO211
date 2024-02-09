package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.ThanhToan;
import fpt.mailinhapp.dto.ThanhToanDto;
import fpt.mailinhapp.repository.ThanhToanRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PayMentService {
    @Autowired
    ThanhToanRepository dao;
    @Transactional(rollbackFor = Exception.class)
    public void  save(ThanhToanDto dto ) {
        ThanhToan entity = new ThanhToan();
        BeanUtils.copyProperties(dto,entity);
        dao.save(entity);
    }

}
