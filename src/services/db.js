export const dbService = {

    async readAll() {
        try {
          const data = JSON.parse(localStorage.getItem('dbData')) || [];
          return data;
        } catch (error) {
          console.error('Error reading data from the database:', error);
          throw error;
        }
      },
    
      async create(title, price, category) {
        try {
    
          const newItem = {
            title,
            price,
            category,
            date: new Date()
          };
    
          const existingData = JSON.parse(localStorage.getItem('dbData')) || [];
    
          existingData.push(newItem);
    
          localStorage.setItem('dbData', JSON.stringify(existingData));
    
          return newItem;
        } catch (error) {
          console.error('Error creating item in the database:', error);
          throw error;
        }
      },
}