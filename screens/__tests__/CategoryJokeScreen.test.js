import 'jsdom-global/register';

import 'react-native';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import axios from 'axios';
import { CategoryJokeProvider } from '../../context/CategoryJokeContext';
import CategoryJokeScreen from '../CategoryJokeScreen';
import MockAdapter from 'axios-mock-adapter';
import {CATEGORY_DETAILS_JOKE_URL} from '../../constants/Urls';
import {act} from 'react-dom/test-utils';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Component tested with airbnb enzyme', () => {
    let httpMock;
    const category = "Cats";
    const url = CATEGORY_DETAILS_JOKE_URL + category;

    beforeEach(()=>{
      httpMock = new MockAdapter(axios);
    })

    it("renders an error if axios call returns an error", async ()=>{
    let wrapper;
    httpMock.onGet(url).reply(404, {});
    await flushAllPromises();  
    await act(async ()=>{
      wrapper = mount(<CategoryJokeProvider>
                        <CategoryJokeScreen route={{params:{category: "Cats"}}}/>
                    </CategoryJokeProvider>,
      );
    });
    expect(wrapper.text()).toContain("An Error Occured");
     
  });

  it("renders category joke successfully", async ()=>{
    let wrapper;
    const responseData = {value: "This is the value"}
    httpMock.onGet(url).reply(200, responseData);
    await flushAllPromises();  
    await act(async ()=>{
      wrapper = mount(<CategoryJokeProvider>
                        <CategoryJokeScreen route={{params:{category: "Cats"}}}/>
                    </CategoryJokeProvider>,
      );
    });
    expect(wrapper.text()).toContain("This is the value");
  });

});



