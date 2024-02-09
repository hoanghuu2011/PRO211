package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.Xe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface XeRepository extends JpaRepository<Xe, String> {
}