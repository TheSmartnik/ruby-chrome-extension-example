document.add_event_listener "DOMContentLoaded" do
  image_path = %w(pic1 pic2 pic3)[rand(3)]
  image = document.get_element_by_id("image")
  full_path = "../images/#{image_path}.jpg"

  image.set_attribute("src", full_path)

  focus_input = document.get_element_by_id("focus")
  chrome.storage.sync.get ["focus"] do |result|
    focus_input.value = result.focus if result.focus
  end

  focus_input.add_event_listener 'keypress' do |event|
    chrome.storage.sync.set({ focus: event.target.value })
  end
end
