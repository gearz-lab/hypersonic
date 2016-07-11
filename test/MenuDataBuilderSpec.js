import { assert } from 'chai';
import menuDataBuilder from '../src/server/lib/menuDataBuilder';

describe('MenuDataBuilder', function() {
   it('Should work', function() {
       let menuData = menuDataBuilder.getMenuData([
           {
               name: 'contact',
               displayNameSingular: 'Contact'
           },
           {
               name: 'phone',
               displayNameSingular: 'Phone'
           }
       ]);
       assert.equal(menuData.contact.display, 'Contact');
       assert.equal(menuData.contact.nodes.new.display, 'New Contact');
   })
});