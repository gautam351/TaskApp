import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
   groups: [],
   currGrp:{},
    loading: false,
    error:""
}







  
const GroupReducer = createSlice({
  name: 'GroupReducer',
  initialState: initialState,
  reducers: {
    setCurrGroups(state: any, action) {
      
      let { groupId } = action.payload;
      if (state.currGrp && state.currGrp?.groupId==groupId)
        state.groups = [...state.groups, action.payload];
      
    }
    ,

    setCurrGroupsApiData(state: any, action) {
      
    
        state.groups =action.payload;
      
    },

    setcurrGroupId(state, action) {
      
      state.currGrp = action.payload;
    },
   
     resetGroupState(state) {
       state.groups = [];
     }


  },
  // extraReducers: {
   
  // },
});


// Action creators are generated for each case reducer function
export const { setCurrGroups ,setcurrGroupId,resetGroupState,setCurrGroupsApiData } = GroupReducer.actions

export default GroupReducer.reducer;