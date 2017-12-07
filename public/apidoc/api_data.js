define({ "api": [
  {
    "type": " delete ",
    "url": "/api/v1/recipes/:recipeId",
    "title": "Delete a recipe",
    "group": "Recipe",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \"Authorization\": \"JWT akjsjasnoie.sdrer434.32fdfrdrer\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "recipeId",
            "description": "<p>Recipe Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP 1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/index.js",
    "groupTitle": "Recipe",
    "name": "_delete_ApiV1RecipesRecipeid"
  },
  {
    "type": " get ",
    "url": "/api/v1/recipes",
    "title": "Get all Recipes",
    "group": "Recipe",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "status",
            "description": "<p>All recipes in the application</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 OK\n{\n   \"id\": 1,\n   \"name\": \"Modified recipe name\",\n   \"description\": \"The best fried rice in the world\",\n   \"img_link\": \"https://some-image-link-here\",\n   \"category\": \"Lunch\",\n   \"ingredients\": [\"Rice\", \"Tomatoes\", \"Plum\", \"Pepper\"],\n   \"instructions\": [\"Cook this damn food well peeps.\"]\n   \"owner\": 2,\n   \"upvote\": 0,\n   \"downvote\": 0,\n   \"favorite\": 0,\n   \"reviews\": [\n       {\n           \"id\": 1,\n           \"content\": \"An Amazing recipe. Great Job!\",\n           \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n           \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n       }\n   ],\n   \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n   \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n},\n{\n   \"id\": 2,\n   \"name\": \"Modified recipe name\",\n   \"description\": \"The best fried rice in the world\",\n   \"img_link\": \"https://some-image-link-here\",\n   \"category\": \"Lunch\",\n   \"ingredients\": [\"Rice\", \"Tomatoes\", \"Plum\", \"Pepper\"],\n   \"instructions\": [\"Cook this damn food well peeps.\"]\n   \"owner\": 2,\n   \"upvote\": 0,\n   \"downvote\": 0,\n   \"favorite\": 0,\n   \"reviews\": [\n       {\n           \"id\": 1,\n           \"content\": \"An Amazing recipe. Great Job!\",\n           \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n           \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n       }\n   ],\n   \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n   \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n},\n{\n   \"id\": 3,\n   \"name\": \"Modified recipe name\",\n   \"description\": \"The best fried rice in the world\",\n   \"img_link\": \"https://some-image-link-here\",\n   \"category\": \"Lunch\",\n   \"ingredients\": [\"Rice\", \"Tomatoes\", \"Plum\", \"Pepper\"],\n   \"instructions\": [\"Cook this damn food well peeps.\"]\n   \"owner\": 2,\n   \"upvote\": 0,\n   \"downvote\": 0,\n   \"favorite\": 0,\n   \"reviews\": [\n       {\n           \"id\": 1,\n           \"content\": \"An Amazing recipe. Great Job!\",\n           \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n           \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n       }\n   ],\n   \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n   \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n},\n{\n   \"id\": 4,\n   \"name\": \"Modified recipe name\",\n   \"description\": \"The best fried rice in the world\",\n   \"img_link\": \"https://some-image-link-here\",\n   \"category\": \"Lunch\",\n   \"ingredients\": [\"Rice\", \"Tomatoes\", \"Plum\", \"Pepper\"],\n   \"instructions\": [\"Cook this damn food well peeps.\"]\n   \"owner\": 2,\n   \"upvote\": 0,\n   \"downvote\": 0,\n   \"favorite\": 0,\n   \"reviews\": [\n       {\n           \"id\": 1,\n           \"content\": \"An Amazing recipe. Great Job!\",\n           \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n           \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n       }\n   ],\n   \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n   \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/index.js",
    "groupTitle": "Recipe",
    "name": "_get_ApiV1Recipes"
  },
  {
    "type": " post ",
    "url": "/api/v1/recipes",
    "title": "Add recipes",
    "group": "Recipe",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Recipe Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Brief description of recipe</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img_link",
            "description": "<p>Link to recipe's image</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Recipe's category</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "ingredients",
            "description": "<p>Recipe's ingredients</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "instructions",
            "description": "<p>Step by step instruction for the recipe</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "input",
          "content": "{\n   \"name\": \"Awesome Fried Rice\",\n   \"description\": \"The best fried rice in the world\",\n   \"img_link\": \"https://some-image-link-here\",\n   \"category\": \"Lunch\",\n   \"ingredients\": [\"Rice\", \"Tomatoes\", \"Plum\", \"Pepper\"],\n   \"instructions\": [\"Cook this damn food well peeps.\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "recipe",
            "description": "<p>Created recipe</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP 1.1 201 OK\n{\n   \"id\": 1,\n   \"name\": \"Awesome Fried Rice\",\n   \"description\": \"The best fried rice in the world\",\n   \"img_link\": \"https://some-image-link-here\",\n   \"category\": \"Lunch\",\n   \"ingredients\": [\"Rice\", \"Tomatoes\", \"Plum\", \"Pepper\"],\n   \"instructions\": [\"Cook this damn food well peeps.\"]\n   \"owner\": 2,\n   \"upvote\": 0,\n   \"downvote\": 0,\n   \"favorite\": 0,\n   \"reviews\": 0,\n   \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n  \"updatedAt\": \"2017-09-17T23:21:18.057Z\", \n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/index.js",
    "groupTitle": "Recipe",
    "name": "_post_ApiV1Recipes"
  },
  {
    "type": " post ",
    "url": "/api/v1/recipes/:recipeId/reviews",
    "title": "Review a recipe",
    "group": "Recipe",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token of authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \"Authorization\": \"JWT akjsjasnoie.sdrer434.32fdfrdrer\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "recipeId",
            "description": "<p>Recipe id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Review</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"content\": \"An Amazing recipe. Great Job!\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP 1.1 201 OK\n{\n   \"id\": 1,\n   \"name\": \"Modified recipe name\",\n   \"description\": \"The best fried rice in the world\",\n   \"img_link\": \"https://some-image-link-here\",\n   \"category\": \"Lunch\",\n   \"ingredients\": [\"Rice\", \"Tomatoes\", \"Plum\", \"Pepper\"],\n   \"instructions\": [\"Cook this damn food well peeps.\"]\n   \"owner\": 2,\n   \"upvote\": 0,\n   \"downvote\": 0,\n   \"favorite\": 0,\n   \"reviews\": [\n       {\n           \"id\": 1,\n           \"content\": \"An Amazing recipe. Great Job!\",\n           \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n           \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n       }\n   ],\n   \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n   \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/index.js",
    "groupTitle": "Recipe",
    "name": "_post_ApiV1RecipesRecipeidReviews"
  },
  {
    "type": " put ",
    "url": "/api/v1/recipes/:recipeId/modify",
    "title": "Modify a recipe",
    "group": "Recipe",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>token of autheticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header",
          "content": "{ \"Authorization\": \"JWT awqnlkjoi.asjaksiuao.djksduise\" }",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "recipeId",
            "description": "<p>Recipe Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Update recipe name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"name\": \"Modified recipe name\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP 1.1 204 No content\n{\n   \"id\": 1,\n   \"name\": \"Modified recipe name\",\n   \"description\": \"The best fried rice in the world\",\n   \"img_link\": \"https://some-image-link-here\",\n   \"category\": \"Lunch\",\n   \"ingredients\": [\"Rice\", \"Tomatoes\", \"Plum\", \"Pepper\"],\n   \"instructions\": [\"Cook this damn food well peeps.\"]\n   \"owner\": 2,\n   \"upvote\": 0,\n   \"downvote\": 0,\n   \"favorite\": 0,\n   \"reviews\": 0,\n   \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n   \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/index.js",
    "groupTitle": "Recipe",
    "name": "_put_ApiV1RecipesRecipeidModify"
  },
  {
    "type": " get ",
    "url": "/api/v1/users/:userId/favorites",
    "title": "Get user favorite recipes",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "userId",
            "description": "<p>User's Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP 201 Ok\n{\n   \"recipes\": [\n      {\n        \"id\": 1,\n        \"name\": \"very delicious dish\",\n        \"description\": \"This is the recipe for a very delicious dish\",\n        \"img_link\": \"https://imgurlfordish.com/verydelicousdish.jpg\",\n        \"ingredients\": [\n          \"something here\",\n          \"something here\",\n        ],\n        \"instructions\": [\n          \"Follow this step to get started on this dish\",\n          \"Second step here\",\n        ],\n        \"upvote\": 0,\n        \"downvotw\": 0,\n        \"favorite\": 1,\n        \"owner\": 2,\n        \"createdAt\": \"2017-09-17T07:52:15.103Z\",\n        \"updatedAt\": \"2017-09-18T23:16:21.324Z\",\n      }\n    ],\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/index.js",
    "groupTitle": "User",
    "name": "_get_ApiV1UsersUseridFavorites"
  },
  {
    "type": " post ",
    "url": "/api/v1/users/signin",
    "title": "Users signup",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Usesr's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "input",
          "content": "{\n   \"email\": \"verninin12\",\n   \"password\": \"password1\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Signin token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP 1.1 201 OK\n{\n   token: \"qweweiorwnjklksnlkds.jksbajskuisab.jskabnskjsuabk\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Authentication error",
          "content": "HTTP 1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/index.js",
    "groupTitle": "User",
    "name": "_post_ApiV1UsersSignin"
  },
  {
    "type": " post ",
    "url": "/api/v1/users/signup",
    "title": "Users Signup",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "input",
          "content": "{\n   \"username\": \"verninin12\",\n   \"email\": \"verninng@gmail.com\",\n   \"password\": \"password1\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "details",
            "description": "<p>User details and token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP 1.1 201 OK\n{\n   \"id\": 1,\n   \"username\": \"verninin12\",\n   \"email\": \"verninng@gmail.com\",\n   \"createdAt\": \"2017-09-17T23:21:18.057Z\",\n   \"updatedAt\": \"2017-09-17T23:21:18.057Z\",\n   token: {\n       \"token\": \"qweuiwehibkjbs.dknsdjiueiw.uiebdhj3242\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Account creation error",
          "content": "HTTP 1.1 409 Conflict",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/index.js",
    "groupTitle": "User",
    "name": "_post_ApiV1UsersSignup"
  }
] });
