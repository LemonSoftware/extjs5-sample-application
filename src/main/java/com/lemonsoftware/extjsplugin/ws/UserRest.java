package com.lemonsoftware.extjsplugin.ws;

import com.lemonsoftware.extjsplugin.bean.BaseResponse;
import com.lemonsoftware.extjsplugin.bean.User;
import com.lemonsoftware.extjsplugin.storage.UserStorage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/users/")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserRest {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserRest.class);

	@Autowired
	UserStorage userStorage;

	@GET
	@Path("all")
	public BaseResponse getAll() {
		LOGGER.trace("Request: getAll");
		List<User> data = userStorage.loadAll();
		BaseResponse response = new BaseResponse.Builder().data(data).success(true).build();
		LOGGER.trace("Response: {}", response);
		return response;
	}

	@POST
	@Path("update")
	public BaseResponse update(User user) {
		LOGGER.trace("Request: user = {}", user);
		userStorage.update(user);
		BaseResponse response = new BaseResponse.Builder().data(user).success(true).build();
		LOGGER.trace("Response: reponse = {}", response);
		return response;

	}

	@POST
	@Path("delete")
	public BaseResponse delete(@QueryParam("id") Long id) {
		LOGGER.trace("Request: id = {}", id);
		userStorage.delete(id);
		return new BaseResponse.Builder().success(true).build();
	}
}
