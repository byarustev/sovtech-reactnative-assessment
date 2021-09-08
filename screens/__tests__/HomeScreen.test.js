import React from 'react';
import { render } from "@testing-library/react-native"
// import Enzyme, { mount } from 'enzyme';
import { CategoriesProvider } from '../../context/CategoriesContext';
import HomeScreen from '../HomeScreen';
import { interpolate } from 'react-native-reanimated';
import { exportAllDeclaration } from '@babel/types';
// import {act} from 'react-dom/test-utils';
// import wait from 'waait';
// import Adapter from 'enzyme-adapter-react-16';
// Enzyme.configure({ adapter: new Adapter() })



it("renders default home elements", ()=>{
  const {getAllByText} = render(
    <CategoriesProvider>
      <HomeScreen/>
  </CategoriesProvider>
  );
  expect(getAllByText('Loading').length).toBe(1)
})