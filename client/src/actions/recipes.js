import uuid from 'uuid';

export const addRecipe = ({ name = '', description = '', img_url = 'no-img-here', category = '', ingredients = [], instructions = [] } = {}) => ({
  type: 'ADD_RECIPE',
  recipe: {
    id: uuid(),
    name,
    description,
    img_url,
    category,
    ingredients,
    instructions,
  },
});

export const editRecipe = (id, updates) => ({
  type: 'EDIT_RECIPE',
  id,
  updates,
});

export const removeRecipe = ({ id } = {}) => ({
  type: 'REMOVE_RECIPE',
  id
})
