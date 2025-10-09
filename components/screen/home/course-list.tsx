import * as React from "react";
import CourseCard from "~/components/common/simple-card";
import { SimpleWrapper } from "~/components/common/simple-wrapper";
import { FlatList } from "react-native";
import { Category, LayoutType, Tag } from "~/types/enum";
import { useListCourse } from "~/hooks/queries/useCourse";
import { Course } from "~/types/course.type";
import { useFocusEffect } from "@react-navigation/native";

export function CourseList() {
  const { data, refetch } = useListCourse({
    config: {
      enabled: true,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  const dataCategory = React.useMemo(() => {
    if (data?.data?.items) {
      const categoryMap: { [key: string]: Course[] } = {};
      data.data.items.forEach((course) => {
        const category = course.category || "Uncategorized";
        if (!categoryMap[category]) {
          categoryMap[category] = [];
        }
        categoryMap[category].push(course);
      });
      return categoryMap;
    }
    return {};
  }, [data]);

  return (
    <>
      {dataCategory &&
        Object.keys(dataCategory).map((category) => (
          <SimpleWrapper
            title={Category[category as keyof typeof Category] ?? category}
            key={category}
          >
            <FlatList
              data={dataCategory[category]}
              renderItem={({ item, index }) => (
                <CourseCard
                  title={item.title}
                  description={item.description}
                  rating={5}
                  tag={index % 2 === 0 ? Tag.NEW : Tag.POPULAR}
                  image={item.image}
                  price={item.price}
                  type={LayoutType.Vertical}
                  id={item.id}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.title}
            />
          </SimpleWrapper>
        ))}
    </>
  );
}
