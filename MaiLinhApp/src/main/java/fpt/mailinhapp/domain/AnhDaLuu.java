package fpt.mailinhapp.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.proxy.HibernateProxy;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "anh_da_luu")
public class AnhDaLuu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "ten_anh", length = 100)
    private String tenAnh;

    @Column(name = "ten_tep")
    private String tenTep;

    @Column(name = "uri")
    private String uri;

}