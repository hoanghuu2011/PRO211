package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.ChuyenXe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ChuyenXeRepository extends JpaRepository<ChuyenXe, Long> {
//    @Query("SELECT c FROM ChuyenXe c WHERE c.tuyenXe.diemDi LIKE %:diemDi% AND c.tuyenXe.diemDen LIKE %:diemDen% AND c.tuyenXe.ngayDi = :ngayDi")
//    List<ChuyenXe> findByTuyenXe_DiemDiLikeAndTuyenXe_DiemDenLikeAndTuyenXe_NgayDi(String diemDi, String diemDen, LocalDate ngayDi);
//
//    @Query("SELECT c FROM ChuyenXe c WHERE c.tuyenXe.diemDi LIKE %:diemDi% AND c.tuyenXe.diemDen LIKE %:diemDen% AND c.tuyenXe.ngayVe = :ngayVe")
//    List<ChuyenXe> findByTuyenXe_DiemDiLikeAndTuyenXe_DiemDenLikeAndTuyenXe_NgayVe(String diemDi, String diemDen, LocalDate ngayVe);
    List<ChuyenXe> findByTuyenXe_DiemDiLikeAndTuyenXe_DiemDenLike(String diemDi, String diemDen);


}
