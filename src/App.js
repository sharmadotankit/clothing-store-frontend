import categories from './components/category-menu/category-menu.js';
import Directory from './components/directory/directory.component.jsx';


const  App = ()=> {
  return (
      <Directory categories={categories} />
  );
}

export default App;
