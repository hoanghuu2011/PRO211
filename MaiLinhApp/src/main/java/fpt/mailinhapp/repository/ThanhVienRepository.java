package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.TaiKhoan;
import fpt.mailinhapp.domain.ThanhVien;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ThanhVienRepository extends CrudRepository<ThanhVien, String> {
    Optional<ThanhVien> findBySoDTAndEmail(String soDT, String email);
}