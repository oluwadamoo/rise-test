
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChoosePlan, CreateInvestmentPlan, CreateInvestmentPlanGoals, CreateInvestmentPlanReview, FundWallet, Home, InvestmentPlanDetails, SelectBank } from '../../screens/home';

const HomeStackNav = createNativeStackNavigator()
export const HomeStack = () => {
    return (
        <HomeStackNav.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <HomeStackNav.Screen name='Home' component={Home} />
            <HomeStackNav.Screen name='CreateInvestmentPlan' component={CreateInvestmentPlan} />
            <HomeStackNav.Screen name='CreateInvestmentPlanGoals' component={CreateInvestmentPlanGoals} />
            <HomeStackNav.Screen name='ReviewInvestmentPlan' component={CreateInvestmentPlanReview} />
            <HomeStackNav.Screen name='InvestmentPlanDetails' component={InvestmentPlanDetails} />
            <HomeStackNav.Screen name='FundWallet' component={FundWallet} />
            <HomeStackNav.Screen name='ChoosePlan' component={ChoosePlan} />
            <HomeStackNav.Screen name='SelectBank' component={SelectBank} />
        </HomeStackNav.Navigator>
    )
}
