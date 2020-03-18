package com.shop.med.dao;

import com.shop.med.entity.MedicineType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineTypeDao extends JpaRepository<MedicineType, Integer> {
}
