package com.lemonsoftware.extjsplugin.ws;

import com.lemonsoftware.extjsplugin.bean.BaseResponse;
import com.lemonsoftware.extjsplugin.bean.Department;
import com.lemonsoftware.extjsplugin.storage.DepartmentStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/departments/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DepartmentRest {

	private static final Logger LOGGER = LoggerFactory.getLogger(DepartmentRest.class);

	@Autowired
	DepartmentStorage departmentStorage;

	@GET
	@Path("all")
	public BaseResponse getAll() {
		LOGGER.trace("Request: getAll");
		List<Department> data = departmentStorage.loadAll();
		BaseResponse response = new BaseResponse.Builder().data(data).success(true).build();
		LOGGER.trace("Response: {}", response);
		return response;
	}

	@POST
	@Path("update")
	public BaseResponse update(Department department) {
		LOGGER.trace("Request: user = {}", department);
		departmentStorage.update(department);
		BaseResponse response = new BaseResponse.Builder().data(department).success(true).build();
		LOGGER.trace("Response: response = {}", response);
		return response;

	}

	@POST
	@Path("delete")
	public BaseResponse delete(@QueryParam("id") Long id) {
		LOGGER.trace("Request: id = {}", id);
		departmentStorage.delete(id);
		return new BaseResponse.Builder().success(true).build();
	}
}
