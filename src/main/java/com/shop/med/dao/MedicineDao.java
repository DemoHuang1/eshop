package com.shop.med.dao;

import com.shop.med.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MedicineDao extends JpaRepository<Medicine,Integer> {
    @Query("select a from Medicine a where a.medType = ?1")
    public List<Medicine> findAllByMedType(String type);
}
