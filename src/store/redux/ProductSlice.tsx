const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    Searcheddata: [],
    SearchedItems: [],
    all: [],
    data: [],
    cake: [],
    burger: [],
    fries: [],
    sandwich: [],
    colddrink: [],
    status: STATUSES.IDLE,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchSearchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSearchProducts.fulfilled, (state, action) => {
        state.categoriesdData = [];
        state.all = [];
        state.cake = [];
        state.burger = [];
        state.fries = [];
        state.sandwich = [];
        state.colddrink = [];
        state.Searcheddata = action.payload;

        for (let i = 0; i < action.payload.length; i++) {
          state.all.push(action.payload[i]);
          if (action.payload[i].category === 'Cake') {
            // console.warn('Cake');
            state.cake.push(action.payload[i]);
          } else if (action.payload[i].category === 'Burger') {
            // console.warn('Burger');
            state.burger.push(action.payload[i]);
          } else if (action.payload[i].category === 'Fries') {
            state.fries.push(action.payload[i]);
          } else if (action.payload[i].category === 'Sandwich') {
            state.sandwich.push(action.payload[i]);
          } else if (action.payload[i].category === 'Colddrink') {
            state.colddrink.push(action.payload[i]);
          }
        }
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchSearchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(fetchSearchedItems.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchSearchedItems.fulfilled, (state, action) => {
        state.SearchedItems = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchSearchedItems.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const {setProducts, setStatus} = ProductSlice.actions;
export default ProductSlice.reducer;

// Thunks

export const fetchProducts = createAsyncThunk(
  'searchproductlist/fetch',
  async () => {
    const res = await fetch('https://cackestoreapi.onrender.com/productlist');
    const data = await res.json();
    return data;
  },
);

export const fetchSearchProducts = createAsyncThunk(
  'productlist/fetch',
  async productName => {
    let name = productName.title;
    let itemName = name == undefined ? '' : name;
    const res = await fetch(
      `https://cackestoreapi.onrender.com/api/productSearch?name=${itemName}`,
    );
    const data = await res.json();
    return data;
  },
);

export const fetchSearchedItems = createAsyncThunk(
  'productItems/fetch',
  async productName => {
    const spliceTitle = productName.slice(0, 3);
    console.warn(
      `https://cackestoreapi.onrender.com/api/productSearch?name=${spliceTitle}`,
    );
    const res = await fetch(
      `https://cackestoreapi.onrender.com/api/productSearch?name=${spliceTitle}`,
    );
    const data = await res.json();
    return data;
  },
);

export const productSearchByCategory = createAsyncThunk(
  'productSearchByCategory/fetch',
  async productName => {
    let name = productName;
    let itemName = name == undefined ? '' : name;
    const res = await fetch(
      `https://cackestoreapi.onrender.com/api/productSearchByCategory?category=${itemName}`,
    );
    const data = await res.json();
    return data;
  },
);

export const addToCartPost = createAsyncThunk(
  'type/addcartpost',
  async addcartdata => {
    try {
      let response = await fetch(
        'https://cackestoreapi.onrender.com/api/v1/addcartpost/',
        {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(addcartdata),
          headers: {'Content-Type': 'application/json'},
        },
      );
      // let user = response.json();
      // return user;
    } catch (error) {
      // this is the main part. Use the response property from the error object
      return error.response;
    }
  },
);
