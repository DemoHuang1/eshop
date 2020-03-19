package com.shop.med.service;

import com.shop.med.dao.MedicineDao;
import com.shop.med.dao.MedicineTypeDao;
import com.shop.med.entity.Medicine;
import com.shop.med.entity.MedicineType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class MedicineService {

    @Autowired
    private MedicineDao medicineDao;

    @Autowired
    private MedicineTypeDao medicineTypeDao;

    public void add(Medicine medicine){
        medicineDao.save(medicine);
    }

    public void delete(Medicine medicine){
        medicineDao.deleteById(medicine.getId());
    }

    public void update(Medicine medicine){
        Medicine tmp=medicineDao.findById(medicine.getId()).get();
        tmp.setName(medicine.getName());
        tmp.setMedCharacter(medicine.getMedCharacter());
        tmp.setMainFunc(medicine.getMainFunc());
        tmp.setPicture(medicine.getPicture());  //修改图片、名称、特性这些，后期有需要可以添加修改项
        medicineDao.save(tmp);
    }

    public List<Medicine> recommendMedicins(){
        List<Medicine> list = new ArrayList<>();

        int count = 0;
        while (list.size()<5 && count < 5){
            int type = new Random(System.currentTimeMillis()).nextInt(5)+1;
            list.addAll(medicineDao.findAllByMedType(type+""));
            count++;
        }
        return list;
    }

    public List<Medicine> findMedicinesByType(String type){

        List<Medicine> list =medicineDao.findAllByMedType(type);
        return list;
    }

    public String findTypeNameByIndex(String index){
        String name = medicineTypeDao.getTypeNameByIndex(index);
        return name;
    }

    public List<MedicineType> findAllType(){
        return medicineTypeDao.findAll();
    }

    public Medicine findById(int id){
        return medicineDao.findById(id).get();
    }

    public List<Medicine> findAllMedicine(){
        return medicineDao.findAll();
    }

    public void deleteById(int id){
        medicineDao.deleteById(id);
    }
}
