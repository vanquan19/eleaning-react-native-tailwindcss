import * as React from "react";
import { ScrollView, View } from "react-native";
import ScreenLayout from "~/components/common/screen-layout";
import { TypographyH4 } from "~/components/ui/typography-h2";
import { SearchInput } from "~/components/screen/home/search";
import { TextInput } from "react-native";
import { useListCourseWithTitle } from "~/hooks/queries/useCourse";
import { CourseCardMini } from "~/components/common/simple-card";
import { ChevronLeftIcon } from "lucide-react-native";
export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [search, setSearch] = React.useState("");
  const { data } = useListCourseWithTitle({
    title: searchQuery,
    config: { enabled: !!searchQuery },
  });

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <ScreenLayout>
      <View>
        <View className="mb-4 h-fit relative flex flex-row justify-between items-center">
          <TextInput
            onChange={(e) => setSearch(e.nativeEvent.text)}
            placeholder="Tìm kiếm khóa học..."
            className="w-full px-6 py-4 text-lg border border-gray-200 rounded-3xl focus:border-primary mx-1 placeholder:font-medium placeholder:text-gray-400"
          />
        </View>
        <ScrollView>
          <TypographyH4 className="mb-4">Kết quả tìm kiếm</TypographyH4>
          {Array.isArray(data?.data?.items) && data.data.items.length > 0 ? (
            data.data.items.map((item) => (
              <CourseCardMini
                key={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                image={item.image}
                rating={5}
                id={item.id}
              />
            ))
          ) : (
            <TypographyH4 className="text-center mt-8 text-gray-400">
              Không tìm thấy kết quả
            </TypographyH4>
          )}
        </ScrollView>
      </View>
    </ScreenLayout>
  );
}
