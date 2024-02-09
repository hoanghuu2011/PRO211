package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.AnhDaLuu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AnhDaLuuRepository extends JpaRepository<AnhDaLuu, Long> {
    AnhDaLuu findByTenTepLike(String tenTep);


}