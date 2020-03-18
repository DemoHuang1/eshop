package com.shop.med.dao;

import com.shop.med.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicineDao extends JpaRepository<Medicine,Integer> {
}
