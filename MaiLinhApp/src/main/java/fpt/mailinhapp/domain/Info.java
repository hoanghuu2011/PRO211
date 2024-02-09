package fpt.mailinhapp.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "info")
public class Info {


    @Column(name = "email", length = 100)
    private String email;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "so_dt", length = 13)
    private String soDT;

    @Column(name = "ho_ten", length = 50)
    private String hoTen;

}