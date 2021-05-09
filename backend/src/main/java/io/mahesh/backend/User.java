package io.mahesh.backend;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;
// import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity(name = "user")
// @Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @Column(name = "name", nullable = false, length = 200)
    @NotBlank
    @NotEmpty
    private String name;

    @NotBlank
    @NotEmpty
    @Column(name = "email", nullable = false, unique = true, length = 200)
    private String email;

    @NotBlank
    @NotEmpty
    @Column(name = "password", nullable = false) // "Column" class NOT have "blankable"
    private String password;
}