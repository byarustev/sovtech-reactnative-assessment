import 'jsdom-global/register';

import 'react-native';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import axios from 'axios';
import SearchScreen from '../SearchScreen';
import MockAdapter from 'axios-mock-adapter';
import {act} from 'react-dom/test-utils';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })


describe('Component tested with airbnb enzyme', () => {
    let httpMock;

    beforeEach(()=>{
      httpMock = new MockAdapter(axios);
    })

    it("renders search button", async ()=>{
    let wrapper; 
    await act(async ()=>{
      wrapper = mount(<SearchScreen/>
      );
    });
    expect(wrapper.text()).toContain("Search");
  });


});



