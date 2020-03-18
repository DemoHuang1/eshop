package com.shop.med.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name= "medicine_type" )
@NoArgsConstructor
@AllArgsConstructor
public class MedicineType implements Serializable {
    private static final long serialVersionUID=594829320797158214L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;

    public String index;
    public String name;
}
