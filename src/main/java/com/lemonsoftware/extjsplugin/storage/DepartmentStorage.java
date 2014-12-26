package com.lemonsoftware.extjsplugin.storage;

import com.lemonsoftware.extjsplugin.bean.Department;
import org.springframework.stereotype.Component;

import javax.inject.Singleton;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component
@Singleton
public class DepartmentStorage {

	private long idSequence = 0;
	private List<Department> storage;


	public DepartmentStorage() {
		storage = new ArrayList<>();
		initStorage();
	}

	private void initStorage() {
		storage.add(new Department(generateId(), "IT"));
	}

	private long generateId() {
		++this.idSequence;
		return idSequence;
	}

	public List<Department> loadAll() {
		return storage;
	}

	public void delete(Long departmentId) {
		if (departmentId == null) {
			throw new IllegalArgumentException("Cannot find department by id = null");
		}
		Iterator<Department> iterator = storage.iterator();
		while (iterator.hasNext()) {
			Department department = iterator.next();
			if (department.getId().equals(departmentId)) {
				iterator.remove();
				break;
			}
		}
	}

	public void update(Department department) {
		if (department.getId() == null) {
			department.setId(generateId());
			storage.add(department);
		} else {
			Department updated = findDepartmentById(department.getId());
			updated.setName(department.getName());
		}
	}

	public Department findDepartmentById(Long id) {
		if (id == null) {
			throw new IllegalArgumentException("Cannot find user by id = null");
		}
		Department result = null;
		for (Department department : storage) {
			if (department.getId().equals(id)) {
				result = department;
				break;
			}
		}
		return result;
	}
}
