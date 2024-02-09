package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.PhanHoi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PhanHoiRepository extends JpaRepository<PhanHoi, Long> {
    List<PhanHoi> findByTaiKhoan_TenTaiKhoanLike(String tenTaiKhoan);

}