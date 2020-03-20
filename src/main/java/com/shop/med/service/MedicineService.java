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
        //不能被更新的两项输入，以免覆盖。
        medicine.setCheckTime(tmp.getCheckTime());
        medicine.setMedType(tmp.getMedType());
        medicineDao.save(medicine);
    }

    public List<Medicine> recommendMedicins(String type){
        List<Medicine> list = new ArrayList<>();
        if(type!=null){
            String[] types = type.split(",");
            List<Medicine> result = medicineDao.findAllByMedType(types[0]);
            for(int i = 0 ; i < 4; i++){
                list.add(result.get(i));
            }
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
