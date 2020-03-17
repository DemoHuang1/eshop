package com.shop.med.utils;

import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.net.NetworkInterface;

public class IdWorker {
    //时间起始标记点，作为基准，一般取系统的最近时间
    private final static long twepoch=1288834974657L;
    //机器标识位数
    private final static long workerIdBits=5L;

    private final static long datacenterIdBits=5L;

    private final static long maxWorkerId=-1L^(-1L<<workerIdBits);

    private final static long maxDatacenterId=-1L^(-1L<<datacenterIdBits);
    private final static long sequenceBits=12L;

    private final static long workerIdShift=sequenceBits;

    private final static long datacenterIdShift=sequenceBits+workerIdBits;

    private final static long timestampLeftShift=sequenceBits+workerIdBits+datacenterIdBits;

    private final static long sequenceMask=-1L^(-1L<<sequenceBits);

    private static long lastTimestamp=-1L;

    private long sequence=0L;

    private final long workerId;

    private final long datacenterId;

    public IdWorker(){
        this.datacenterId=getDatacenterId(maxDatacenterId);
        this.workerId=getMaxWorkerId(datacenterId,maxWorkerId);
    }

    public IdWorker(long workerId, long datacenterId){
        if(workerId>maxWorkerId||workerId<0){
            throw new IllegalArgumentException(String .format("worker Id can't be greater than %d or less than %d",maxWorkerId,0));
        }
        if(datacenterId>maxDatacenterId||datacenterId<0){
            throw new IllegalArgumentException(String .format("datacenter Id can't be greater than %d or less than %d",maxDatacenterId,0));
        }
        this.workerId=workerId;
        this.datacenterId=datacenterId;
    }

    public synchronized long nextId(){
        long timestamp=timeGen();
        if(timestamp<lastTimestamp){
            throw new RuntimeException(String .format("Clock moved backwards,Refusing to generate id"));
        }
        if(lastTimestamp==timestamp){
            sequence=(sequence+1)&sequenceMask;
            if(sequence==0){
                timestamp=tilNextMillis(lastTimestamp);
            }
        }else{
            sequence=0;
        }
        lastTimestamp=timestamp;
        long nextId=((timestamp-twepoch)<<timestampLeftShift)|(datacenterId<<datacenterIdShift)|(workerId<<workerIdShift)|sequence;
        return nextId;
    }
    private long tilNextMillis(final long lastTimestamp){
        long timestamp=this.timeGen();
        while(timestamp<=lastTimestamp){
            timestamp=this.timeGen();
        }
        return timestamp;
    }

    private long timeGen(){
        return System.currentTimeMillis();
    }

    protected static long getMaxWorkerId(long datacenterId,long maxWorkerId){
        StringBuffer mpid=new StringBuffer();
        mpid.append(datacenterId);
        String name= ManagementFactory.getRuntimeMXBean().getName();
        if(!name.isEmpty()){
            mpid.append(name.split("@")[0]);
        }
        return (mpid.toString().hashCode()&0xffff)%(maxWorkerId+1);
    }

    protected static long getDatacenterId(long maxDatacenterId){
        long id=0L;
        try{
            InetAddress ip=InetAddress.getLocalHost();
            NetworkInterface netWork=NetworkInterface.getByInetAddress(ip);
            if(netWork==null){
                id=1L;
            }else{
                byte[] mac=netWork.getHardwareAddress();
                id=((0x000000ff & (long)mac[mac.length-1])|((0x0000ff00 & ((long)mac[mac.length-2])<<8)))>>6;
                id=id%(maxDatacenterId+1);
            }
        }catch (Exception e){
            System.out.println("getDatacenterId: "+e.getMessage());
        }
        return id;
    }

}
