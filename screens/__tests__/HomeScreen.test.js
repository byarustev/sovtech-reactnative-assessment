import 'jsdom-global/register';

import 'react-native';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import axios from 'axios';
import { CategoriesProvider } from '../../context/CategoriesContext';
import HomeScreen from '../HomeScreen';
import MockAdapter from 'axios-mock-adapter';
import {CATEGORIES_URL} from '../../constants/Urls';
import {act} from 'react-dom/test-utils';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Component tested with airbnb enzyme', () => {
    let httpMock;
    
    beforeEach(()=>{
      httpMock = new MockAdapter(axios);
    })

    it("renders default home elements", async ()=>{
    let wrapper;
    httpMock.onGet(CATEGORIES_URL).reply(404, {});
    await flushAllPromises();  
    await act(async ()=>{
      wrapper = mount(<CategoriesProvider>
                        <HomeScreen/>
                    </CategoriesProvider>,
      );
    });
    expect(wrapper.text()).toContain("An Error Occured");
     
  });

  it("renders categories on successful axios api call", async ()=>{
    let wrapper;
    const responseData = ['Cats', 'Farmily', 'Hats']
    httpMock.onGet(CATEGORIES_URL).reply(200, responseData);
    await flushAllPromises();  
    await act(async ()=>{
      wrapper = mount(<CategoriesProvider>
                        <HomeScreen/>
                    </CategoriesProvider>,
      );
    });
    expect(wrapper.text()).toContain("Farmily");
    
  });

});



