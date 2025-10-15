import React from 'react';
import RestaurantHome from './RestaurantHome';
import RestaurantProfileView from './RestaurantProfileView';
import RestaurantChangePassword from './RestaurantChangePassword';
import RestaurantViewMessages from './RestaurantViewMessages';
import ViewCustomers from './ViewCustomers';
import AddFoodItems from './AddFoodItems';
import ViewFoodItems from './ViewFoodItems';
import RestaurantAddFoodCategory from './RestaurantAddFoodCategory';
import ViewCategory from './ViewCategory';
import ManageTable from './ManageTable';
import ViewQRCODE from './ViewQRCODE';
import AddCustomers from './AddCustomers';


const RightContainer = ({ activeView }) => {
  const renderComponent = () => {
    switch (activeView) {
      // case 'home':
      //   return <RestaurantHome />;
      case 'profile':
        return <RestaurantProfileView />;
      case 'changePassword':
        return <RestaurantChangePassword />;
      case 'messages':
        return <RestaurantViewMessages />;
        case 'customers':
          return <ViewCustomers/>
          case 'addFoodItems':
            return <AddFoodItems/>
            case 'viewFoodCollection':
              return <ViewFoodItems/>
              case 'addFoodCategory':
                return <RestaurantAddFoodCategory/>
                case 'manageTables':
                  return <ManageTable/>
                case 'viewFoodCategory':
                  return <ViewCategory/>      
                  case 'viewQRCode':
                  return <ViewQRCODE/>                        
      case 'ViewCustomers':
        return <ViewCustomers />;
        case 'Addcustomers':
                  return <AddCustomers/> 
      // default:
      //   return <AdminHome />;
    }
  };

  return (
    <div className='dashboard-content'>
      <div className='container'>
        {renderComponent()}
      </div>
    </div>
  );
};

export default RightContainer;
