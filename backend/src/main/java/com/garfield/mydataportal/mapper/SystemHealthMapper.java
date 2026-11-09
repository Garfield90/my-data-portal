package com.garfield.mydataportal.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SystemHealthMapper {
    String selectDatabaseVersion();
}
