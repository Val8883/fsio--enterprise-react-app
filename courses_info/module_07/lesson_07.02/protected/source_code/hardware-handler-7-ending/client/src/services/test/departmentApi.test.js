import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { FETCH_DEPARTMENT_DATA_ERROR } from '../../constants/constants';
import dataSet from '../../__mocksData__/mockDataSet.json';
import * as departmentApi from '../departmentApi';

describe('testing department API service', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it('should return all departments when the getAllDepartments endpoint is called', async () => {
    const mockAllDepartments = dataSet.departments;
    mock.onGet('/departments').reply(200, mockAllDepartments);
    const actualDepartments = await departmentApi.getAllDepartments();
    expect(actualDepartments).toEqual(mockAllDepartments);
  });

  it('should return an error message when the getAllDepartments call fails', async () => {
    const mockErrorMsg = FETCH_DEPARTMENT_DATA_ERROR;
    mock.onGet('/departments').reply(500, FETCH_DEPARTMENT_DATA_ERROR);
    const actualErrorMsg = await departmentApi.getAllDepartments();
    expect(actualErrorMsg).toEqual(mockErrorMsg);
  });
});
