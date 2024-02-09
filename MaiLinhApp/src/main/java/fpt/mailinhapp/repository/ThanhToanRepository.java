package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.DatVe;
import fpt.mailinhapp.domain.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ThanhToanRepository extends JpaRepository<ThanhToan, Long> {



}
