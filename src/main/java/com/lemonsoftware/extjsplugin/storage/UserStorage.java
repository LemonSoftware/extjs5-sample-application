package com.lemonsoftware.extjsplugin.storage;

import com.lemonsoftware.extjsplugin.bean.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.inject.Singleton;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
@Singleton
public class UserStorage {

	private long idSequence = 0;
	private List<User> storage;

	@Autowired
	private DepartmentStorage departmentStorage;

	@Autowired
	private ApplicationContext appContext;


	public UserStorage() {
		storage = new ArrayList<>();
	}

	@PostConstruct
	private void initStorage() {
		User user = new User(generateId(), "John", "Smith", "user", 1L);
		user.setDepartment(departmentStorage.findDepartmentById(1L));
		storage.add(user);

	}

	private long generateId() {
		++this.idSequence;
		return idSequence;
	}

	public List<User> loadAll() {
		return storage;
	}

	public void delete(Long userId) {
		if (userId == null) {
			throw new IllegalArgumentException("Cannot find user by id = null");
		}
		Iterator<User> iterator = storage.iterator();
		while (iterator.hasNext()) {
			User user = iterator.next();
			if (user.getId().equals(userId)) {
				iterator.remove();
				break;
			}
		}
	}

	public void update(User user) {
		if (user.getId() == null) {
			user.setId(generateId());
			storage.add(user);
		} else {
			User updated = findUserById(user.getId());
			updated.setFirstName(user.getFirstName());
			updated.setLastName(user.getLastName());
			updated.setUserName(user.getUserName());
		}
	}

	private User findUserById(Long id) {
		if (id == null) {
			throw new IllegalArgumentException("Cannot find user by id = null");
		}
		User result = null;
		for (User user : storage) {
			if (user.getId().equals(id)) {
				result = user;
				break;
			}
		}
		return result;
	}
}
