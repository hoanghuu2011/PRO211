package fpt.mailinhapp.repository;

import fpt.mailinhapp.domain.Info;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoRepository extends JpaRepository<Info, Long> {
    Info findBySoDTLike(String soDT);
}