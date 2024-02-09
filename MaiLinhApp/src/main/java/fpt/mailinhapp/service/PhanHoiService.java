package fpt.mailinhapp.service;

import fpt.mailinhapp.domain.PhanHoi;
import fpt.mailinhapp.dto.PhanHoiDto;
import fpt.mailinhapp.exception.FeedbackException;
import fpt.mailinhapp.repository.PhanHoiRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PhanHoiService {
    @Autowired
    PhanHoiRepository dao;

    @Transactional(rollbackFor = Exception.class)
    public PhanHoiDto createFeedback(PhanHoiDto dto){
        PhanHoi entity = new PhanHoi();
        BeanUtils.copyProperties(dto, entity);
        var saveFB = dao.save(entity);
        dto.setId(saveFB.getId());

        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteFeedback(Long id){
        var found = dao.findById(id).orElseThrow(()->new FeedbackException("Phan hồi không tồn tại"));

        dao.delete(found);
    }

    public List<PhanHoi> findByAccount(String tenTaiKhoan) {
        return dao.findByTaiKhoan_TenTaiKhoanLike(tenTaiKhoan);
    }

    public List<PhanHoi> findAll() {
        return dao.findAll();
    }
}
