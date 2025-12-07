import * as React from "react";
import { ScrollView } from "react-native";
import ScreenLayout from "~/components/common/screen-layout";

import { SimpleCategories } from "~/components/screen/home/categories";
import { CourseList } from "~/components/screen/home/course-list";
import { HeaderHome } from "~/components/screen/home/header";
import { SearchInput } from "~/components/screen/home/search";
import { Slider } from "~/components/screen/home/slider";

export default function HomeScreen() {
  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderHome />
        <SearchInput />
        <SimpleCategories />
        <Slider />
        <CourseList />
      </ScrollView>
    </ScreenLayout>
  );
}
