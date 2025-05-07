import os
import json

def merge_jsonl_files(input_folder, output_file):
    """
    Merges all .jsonl files in the specified folder into a single .jsonl file.

    :param input_folder: Path to the folder containing .jsonl files.
    :param output_file: Path to the output .jsonl file.
    """
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for filename in os.listdir(input_folder):
            if filename.endswith('.jsonl'):
                file_path = os.path.join(input_folder, filename)
                with open(file_path, 'r', encoding='utf-8') as infile:
                    for line in infile:
                        outfile.write(line)

if __name__ == "__main__":
    # Define the input folder and output file
    input_folder = os.path.join(os.getcwd(), 'dataset')  # Adjust folder name if needed
    output_file = os.path.join(os.getcwd(), 'merged_dataset.jsonl')

    # Ensure the dataset folder exists
    if not os.path.exists(input_folder):
        print(f"Error: The folder '{input_folder}' does not exist.")
    else:
        merge_jsonl_files(input_folder, output_file)
        print(f"All .jsonl files have been merged into '{output_file}'.")