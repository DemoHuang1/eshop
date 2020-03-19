package com.shop.med.dao;

import com.shop.med.entity.MedicineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MedicineTypeDao extends JpaRepository<MedicineType, Integer> {
 @Query("select a.name from MedicineType a where a.index = ?1")
    public String getTypeNameByIndex(String index);
}
