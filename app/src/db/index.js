import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyD2Cl_OE6u7cq0jj_3ZOjAOH4gdtdz8SVw',
  authDomain: 'sosto-8b5eb.firebaseapp.com',
  databaseURL: 'https://sosto-8b5eb.firebaseio.com',
  projectId: 'sosto-8b5eb',
  storageBucket: 'sosto-8b5eb.appspot.com',
  messagingSenderId: '909958942212',
  appId: '1:909958942212:web:531fcaff4d2e136443ef51',
  measurementId: 'G-ZY65HPC7FG'
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.database();
  }
}
export default Firebase;
