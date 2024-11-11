import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profiles",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="eye" size={24} color="black" />
            ) : (
              <Feather name="eye" size={24} color="gray" />
            ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
            ) : (
              <Ionicons name="chatbubble-ellipses-outline" size={24} color="gray" />
            ),
        }}
      />

      <Tabs.Screen
        name="bio"
        options={{
          title: "Accounts",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />
            ) : (
              <MaterialCommunityIcons name="account-circle-outline" size={24} color="gray" />
            ),
        }}
      />
    </Tabs>
  );
}